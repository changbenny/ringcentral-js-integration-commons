import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import yargs from 'yargs';
import through from 'through2';
import path from 'path';
import fs from 'fs-promise';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import testServerConfig from './test-server/webpack.config';
import demoServerConfig from './demo-server/webpack.config';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import distConfig from './webpack.config';
import Loganberry from 'loganberry';
import cp from 'child_process';
import semver from 'semver';

const TIMEOUT = 30000;
const argv = yargs.argv;
const logger = new Loganberry('gulp');

function getTestSources() {
  const src = new Set();

  // check --folder
  if (argv.folder) {
    if (Array.isArray(argv.folder)) {
      argv.folder.forEach(str => {
        str.split(',').forEach(f => {
          src.add(`${f}/**/*.js`);
        });
      });
    } else {
      argv.folder.split(',').forEach(f => {
        src.add(`${f}/**/*.js`);
      });
    }
  }

  // check --file
  if (argv.file) {
    if (Array.isArray(argv.file)) {
      argv.file.forEach(str => {
        str.split(',').forEach(f => {
          src.add(f);
        });
      });
    } else {
      argv.file.split(',').forEach(f => {
        src.add(f);
      });
    }
  }

  if (!src.size) {
    src.add('test/**/*.js');
  }

  return [...src];
}


gulp.task('pre-coverage', () => (
  gulp.src('src/**/*.js')
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: babelIstanbul.Instrumenter,
    }))
    .pipe(istanbul.hookRequire())
));

gulp.task('test', ['pre-coverage'], () => (
  gulp.src('test/**/*.js')
    .pipe(mocha({
      timeout: TIMEOUT,
    }))
    .pipe(istanbul.writeReports())
));

gulp.task('quick-test', () => (
  gulp.src(getTestSources())
    .pipe(mocha({
      timeout: TIMEOUT,
    }))
));

const jsExt = /\.js$/;
function ensurePosixPath(str) {
  return str.split(path.sep).join('/');
}

gulp.task('test-server', done => {
  const files = new Set();
  const testServerPath = path.resolve(__dirname, 'test-server');
  gulp.src(getTestSources())
    .pipe(through.obj((file, enc, cb) => {
      files.add(ensurePosixPath(path.relative(testServerPath, file.path).replace(jsExt, '')));
      cb();
    }))
    .on('finish', async () => {
      const loaderScript = `mocha.setup('bdd');
        mocha.timeout(${TIMEOUT});
        ${[...files].map(f => `require('${f}');`).join('\n')}
        mocha.run();
      `;

      await fs.writeFile(path.resolve(__dirname, './test-server/auto-loader.js'), loaderScript);

      await new Promise((resolve, reject) => {
        const compiler = webpack(testServerConfig, err => {
          if (err) return reject(err);

          new WebpackDevServer(compiler, {
            contentBase: testServerPath,
            publicPath: testServerConfig.output.publicPath,
            hot: true,
          }).listen(8190);
          return resolve();
        });
      });
      done();
    });
});

gulp.task('demo-server', done => {
  const demoServerPath = path.resolve(__dirname, 'demo-server');

  const compiler = webpack(demoServerConfig, err => {
    if (err) done(err);
    new WebpackDevServer(compiler, {
      contentBase: demoServerPath,
      publicPath: demoServerConfig.output.publicPath,
      hot: true,
    }).listen(8191, () => {
      setTimeout(() => {
        logger.info('listening to port 8191...');
      }, 5000); // not exactly sure when the server is available...
    });
  });
});

async function rm(filepath) {
  if (await fs.exists(filepath)) {
    if ((await fs.stat(filepath)).isDirectory()) {
      await Promise.all(
        (await fs.readdir(filepath))
          .map(item => rm(path.resolve(filepath, item)))
      );
      await fs.rmdir(filepath);
    } else {
      await fs.unlink(filepath);
    }
  }
}

gulp.task('clean', async () => (
  rm(path.resolve(__dirname, 'build'))
));

gulp.task('build', ['clean'], () => (
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build'))
));

gulp.task('dist', async () => {
  await new Promise((resolve, reject) => {
    webpack(distConfig, err => {
      if (err) reject(err);
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    distConfig.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
    ];
    distConfig.output.filename = 'ringcentral-js-integration-commons.min.js';
    webpack(distConfig, err => {
      if (err) reject(err);
      resolve();
    });
  });
});

gulp.task('watch', async () => {
  await new Promise((resolve, reject) => {
    distConfig.watch = true;
    const compiler = webpack(distConfig);

    compiler.watch({}, err => {
      if (err) reject(err);
      compiler.run(compileErr => {
        if (compileErr) reject(compileErr);
      });
    });
  });
});

function splitCmd(cmd) {
  const quotes = [];
  const quoteReg = /(".*?"|'.*?')/;
  const replacementReg = /\{\{([0-9]*)\}\}/;
  let pCmd = cmd;
  let match = quoteReg.exec(pCmd);
  while (match) {
    const replaceStr = `{{${quotes.length}}}`;
    quotes.push(match[0]);
    pCmd = pCmd.replace(match[0], replaceStr);
    match = quoteReg.exec(pCmd);
  }
  return pCmd.split(' ').map(token => {
    const quoteMatch = replacementReg.exec(token);
    if (quoteMatch && quoteMatch[1]) {
      const number = parseInt(quoteMatch[1], 10);
      if (quotes[number]) {
        return quotes[number];
      }
    }
    return token;
  });
}

async function spawn(cmd, opts = {}) {
  return new Promise((resolve, reject) => {
    const [program, ...args] = splitCmd(cmd);
    const options = {
      stdio: 'inherit',
    };
    Object.assign(options, opts);
    cp.spawn(program, args, options).on('exit', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    }).on('error', reject);
  });
}

gulp.task('release-clean', async () => {
  if (!await fs.exists('release')) {
    await fs.mkdir('release');
  }
  const files = (await fs.readdir('release')).filter(file => !/^\./.test(file));
  for (const file of files) {
    await rm(path.resolve(__dirname, 'release', file));
  }
});

gulp.task('release-copy', ['build', 'release-clean'], () => (
  gulp.src('build/**')
    .pipe(gulp.dest('release'))
));

gulp.task('release', ['release-copy'], async () => {
  const packageInfo = JSON.parse(await fs.readFile('package.json'));
  delete packageInfo.scripts;
  packageInfo.main = 'rc-phone.js';
  await fs.writeFile('release/package.json', JSON.stringify(packageInfo, null, 2));
});



// async function bumpVersion(type) {
//   const packageInfo = JSON.parse(await fs.readFile('package.json'));
//   packageInfo.version = semver.inc(packageInfo.version, type);

//   const releaseInfo = {};
//   Object.assign(releaseInfo, packageInfo);
//   delete releaseInfo.scripts;

//   await fs.writeFile('package.json', JSON.stringify(packageInfo, null, 2), 'utf8');
//   await fs.writeFile('release/package.json', JSON.stringify(releaseInfo, null, 2), 'utf8');
//   return packageInfo.version;
// }
// async function tagSource(version) {
//   await spawn('git add .');
//   await spawn(`git commit -m 'version ${version}'`);
//   await spawn(`git tag -a ${version} -m 'version ${version}'`);
// }
// async function tagRelease(version) {
//   const opts = {
//     cwd: path.resolve('release'),
//   };
//   await spawn('git add .', opts);
//   await spawn(`git commit -m 'version ${version}'`, opts);
// }
// async function checkForChanges(gitPath = __dirname) {
//   const res = cp.execSync('git status -s', {
//     cwd: path.resolve(gitPath),
//   })
//     .toString()
//     .split(/\r?\n/)
//     .map(line => line.trim())
//     .filter(line => (
//       line !== ''
//   ));
//   return res.length > 0;
// }

// gulp.task('release-package-patch', ['release-copy'], async () => {
//   if (await checkForChanges(path.resolve('release'))) {
//     const version = await bumpVersion('patch');
//     await tagSource(version);
//     await tagRelease(version);
//   } else {
//     logger.info('No changes found in build...');
//   }
// });
// gulp.task('release-package-minor', ['release-copy'], async () => {
//   if (await checkForChanges(path.resolve('release'))) {
//     const version = await bumpVersion('minor');
//     await tagSource(version);
//     await tagRelease(version);
//   } else {
//     logger.info('No changes found in build...');
//   }
// });
// gulp.task('release-package-major', ['release-copy'], async () => {
//   if (await checkForChanges(path.resolve('release'))) {
//     const version = await bumpVersion('major');
//     await tagSource(version);
//     await tagRelease(version);
//   } else {
//     logger.info('No changes found in build...');
//   }
// });


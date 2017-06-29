'use strict';

module.exports = function() {
  $.gulp.task('ftp', function () {
    return $.gulp.src('./build/**/*')
        .pipe($.gp.sftp({
          host: $.path.appSettings.host,
          user: $.path.appSettings.user,
          pass: $.path.appSettings.password,
          remotePath: $.path.appSettings.remotePath
        }));
  });
};

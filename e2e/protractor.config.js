// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  params: {
    resolutionConfig: 'default', //could be default, mobile or tablet
    default: { //set whatever res you need
        resWidth: 1700,
        resHeight: 1500,
        titleLocator: '//div[@title="defaultTitle]"'
    },
    mobile: {
        resWidth: 800,
        resHeight: 1000,
        titleLocator: '//div[@title="mobileTitle]"'
    },
    tablet: {
        resWidth: 1200,
        resHeight: 1200,
        titleLocator: '//div[@title="tabletTitle]"'
    }
},
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  chromeOnly: true,
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    // @ts-ignore
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: StacktraceOption.PRETTY
      }
    }));
    
  }
};

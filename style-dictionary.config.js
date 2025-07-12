const config = {
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/',
      files: [{
        destination: 'design-tokens.css',
        format: 'css/variables',
        options: {
          selector: ':root'
        }
      }]
    }
  }
};

export default config;

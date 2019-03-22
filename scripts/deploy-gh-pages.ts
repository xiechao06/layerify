import * as ghPages from 'gh-pages';

ghPages.publish('doc', {}, err => {
  if (err) {
    console.error(err);
  }
  console.log('published!');
});

# node-poller-send-ir

Used for my session on Drupal and IoT on Drupalcamp Oslo 2015.

In the demo I showed sending the on/off signal for a TV-remote based on a new node being posted with the word "dog" in it.

## Example usage:

```js
require('./')({
  url: 'http://example.com/my-poll-endpoint',
  magicWord: 'dog'
});

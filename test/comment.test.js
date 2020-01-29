const libxml = require('../index');

describe('comment', () => {
  describe('throws', () => {
    it('throws without new', () => {
      const doc = libxml.Document();

      expect(() => libxml.Comment(doc, 'Test')).toThrow(
        "Class constructor Comment cannot be invoked without 'new'"
      );
    });
    it('throws without doc', () => {
      expect(() => new libxml.Comment()).toThrow('document argument required');
    });
    it('throws if doc is a primitive', () => {
      expect(() => new libxml.Comment('test')).toThrow(
        'document argument must be an instance of Document'
      );
    });
    it('throw if doc is empty object', () => {
      expect(() => new libxml.Comment({})).toThrow(
        'document argument must be an instance of Document'
      );
    });
    it('throw if doc is wrong object', () => {
      const doc = libxml.Document();
      const text = new libxml.Text(doc, 'test Text');

      expect(() => new libxml.Comment(text)).toThrow(
        'document argument must be an instance of Document'
      );
    });
  });
  it('new', () => {
    const doc = libxml.Document();
    const comm = new libxml.Comment(doc, 'comment1');

    doc.root(comm);
    expect('comment1').toBe(comm.text());
  });

  it('text', () => {
    const doc = libxml.Document();
    const comm = new libxml.Comment(doc);

    comm.text('comment2');
    expect('comment2').toBe(comm.text());
  });

  it('textWithSpecialCharacters', () => {
    const doc = libxml.Document();
    const comm = new libxml.Comment(doc);
    const theText = 'my comment <has> special ch&r&cters';

    comm.text(theText);
    expect(theText).toBe(comm.text());
  });

  it('toStringWithSpecialCharacters', () => {
    const doc = libxml.Document();
    const comm = new libxml.Comment(doc);
    const theText = 'my comment <has> special ch&r&cters';

    comm.text(theText);
    expect(`<!--${theText}-->`).toBe(comm.toString());
  });
});

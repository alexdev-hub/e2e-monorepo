import { Writer } from "writer-sdk";

describe("Writer SDK Cypress Test", () => {
  let writer: Writer;

  before(() => {
    writer = new Writer();
  });

  it("should create a document and validate schema", () => {
    const doc = writer({
      title: "Test Document",
      content: [
        { type: "paragraph", text: "Hello, this is a test." },
        { type: "image", url: "https://example.com/image.png" },
      ],
    });

    // Validate document schema
    expect(doc).to.have.property("title", "Test Document");
    expect(doc.content).to.be.an("array").with.length(2);
    expect(doc.content[0]).to.have.property("type", "paragraph");
    expect(doc.content[0]).to.have.property("text").that.is.a("string");
    expect(doc.content[1]).to.have.property("type", "image");
    expect(doc.content[1]).to.have.property("url").that.includes("https://");
  });
});

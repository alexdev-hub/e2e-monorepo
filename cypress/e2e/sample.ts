import Writer from 'writer-sdk';

const client = new Writer({
  apiKey: process.env['WRITER_API_KEY'], // This is the default and can be omitted
});

async function main() {
  const completion = await client.completions.create({
    model: 'palmyra-x-003-instruct',
    prompt: 'Write me a short SEO article about camping gear',
  });

  console.log(completion.choices);
}

main();
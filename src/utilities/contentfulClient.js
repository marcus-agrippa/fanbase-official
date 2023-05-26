import { createClient } from 'contentful';

const client = createClient({
  space: 'wrdrmb71arrp',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'SlGsBB2djcm0ugWrPbUV6jXVwE8OrNjPoYE4amhZeVk',
});

async function getTagName(tagId) {
  const tag = await client.getTag(tagId);
  return tag.name;
}

client
  .getEntries()
  .then((response) => console.log(response.items))
  .catch(console.error);

export default client;
export { getTagName };




// @flow

const GITHUB_URL = "https://api.github.com";

export type TMember = {
  avatar_url: string,
  login: string,
  site_admin: boolean,
  id: number,
  repos_url: string,
  html_url: string,
  organisation: string
};
type TMembers = Array<TMember>;
const ORGANISATION = "inthepocket";

export function getOrganisationMembers(organisation = ORGANISATION): TMembers {
  const url = `${GITHUB_URL}/orgs/${organisation}/members`;
  return fetch(url)
    .then(response => response.json())
    .then(jsonResponse =>
      jsonResponse.map(member => ({ ...member, organisation }))
    );
}

export function getUserDetails(login) {
  const url = `${GITHUB_URL}/users/${login}`;
  return fetch(url).then(response => response.json());
}

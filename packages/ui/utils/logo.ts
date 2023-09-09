export type GetLogoWithParamsParams = {
  host?: string;
  group: string;
  team: string;
  logo: string;
};

export const getLogoWithParams = ({
  host,
  group,
  logo,
  team,
}: GetLogoWithParamsParams) => {
  return `${host ?? ""}/api/assets/${group}/${team}/${logo}.svg`;
};

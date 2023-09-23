import { MenuOption, districts } from "../store";

export const districtSorter = (state: string): MenuOption[] => {
  const filteredDistricts = districts.filter(
    (district) => district.state === state
  );
  const res = filteredDistricts.sort((a, b) => a.label.localeCompare(b.label));
  return res;
};

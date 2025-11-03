import { SvgProps } from "react-native-svg";
import { searchIcon, starFillIcon, starHalfIcon, starIcon } from "../../resources/assets/icons";

const icons = {
  search: searchIcon,
  star: starIcon,
  starHalf: starHalfIcon,
  starFill: starFillIcon,
};

export type IconName = keyof typeof icons;

export default function Icon({ name, fill, ...props }: SvgProps & { name: IconName, fill?: string }) {
  const IconComponent = icons[name];
  return <IconComponent {...props} fill={fill} />;
}
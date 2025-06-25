interface LogoProps {
  value: string;
}

export const Logo = ({ value }: LogoProps) => {
  return <h1>{value}</h1>;
};

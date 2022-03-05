import { Icon, Text, Link as ChakraLink, LinkProps, Link } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProsp extends LinkProps {
  children: string;
  icon: ElementType;
  href: string;
}

export function NavLink({children, icon, href, ...rest}: NavLinkProsp) {
  return (
    <ActiveLink href={href}>
      <ChakraLink display="flex" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}
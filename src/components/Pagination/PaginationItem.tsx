import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({number, isCurrent = false, onPageChange}: PaginationItemProps) {
  if (isCurrent)
    return (
      <Button size="sm" fontSize="xs" width="4" colorScheme="pink" disabled _disabled={{bgColor: 'pink.500', cursor: 'pointer'}}>{number}</Button>
    );
  else
    return (
      <Button size="sm" fontSize="xs" width="4" bgColor="gray.700" onClick={() => onPageChange(number)} _hover={{bgColor: 'gray.500', cursor: 'pointer'}}>{number}</Button>
    );
}
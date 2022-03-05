import { FormLabel, FormControl, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage } from "@chakra-ui/react";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error = null, ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
      <ChakraInput id={name} name={name} {...rest} ref={ref} focusBorderColor="pink.500" backgroundColor="gray.900" variant="filled" _hover={{backgroundColor: 'gray.900'}} size="lg" />

      { !!error && (
        <FormErrorMessage>
          { error.message }
        </FormErrorMessage>
      ) }
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);
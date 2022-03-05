import { Flex, Button, Stack } from "@chakra-ui/react";
import { string } from "prop-types";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../components/Form/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email('O e-mail digitado é inválido').required('E-mail é um campo obrigatório'),
  password: yup.string().required('Senha é um campo obrigatório')
});

export default function Home() {
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInFormSchema)
  });
  const {errors} = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(values);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex as="form" onSubmit={handleSubmit(handleSignIn)} width="100%" maxWidth={360} backgroundColor="gray.800" padding="8" borderRadius={8} flexDirection="column">
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" {...register('email')} error={errors.email} />
          <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password} />
        </Stack>

        <Button type="submit" marginTop="6" colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>
      </Flex>
    </Flex>
  )
}

import { Box, Flex, Heading, Button, Divider, VStack, SimpleGrid, HStack, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { string } from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/axios";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome é um campo obrigatório'),
  email: yup.string().email('O e-mail digitado é inválido').required('E-mail é um campo obrigatório'),
  password: yup.string().min(6, 'Mínimo de 6 caracteres').required('Senha é um campo obrigatório'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
});

export default function CreateUser() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {...user, created_at: new Date()}
    });

    return response.data.user;
  }, {
    onSuccess: () => {
      return queryClient.invalidateQueries('users');
    }
  });

  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(createUserFormSchema)
  });
  const {errors} = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values, event) => {
    await createUser.mutateAsync(values);
    await router.push('/users');
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={['6', '6', '8']}>
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '6', '8']} w="100%">
              <Input name="name" label="Nome" {...register('name')} error={errors.name} />
              <Input name="email" type="email" label="E-mail" {...register('email')} error={errors.email} />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '6', '8']} w="100%">
              <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password} />
              <Input name="password_confirmation" type="password" label="Confirmação de senha" {...register('password_confirmation')} error={errors.password_confirmation} />
            </SimpleGrid>
          </VStack>

          <Flex mt={['6', '6', '8']} justify="flex-end">
            <HStack spacing="4">
              <Link href="/users">
                <Button type="button" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
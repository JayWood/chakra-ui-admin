import {Card, CardBody, Divider, HStack, IconButton, Image, Stack, Text} from "@chakra-ui/react";
import {FaCloudDownloadAlt, FaRegTrashAlt} from "react-icons/fa";
import React from "react";

export type Props = {
    playerId: number;
    name: string;
}
export const CharacterCard = ( { playerId, name }: Props ) => (
    <Card maxW="sm">
        <CardBody textAlign="center">
            <Image
                src={`https://images.evetech.net/characters/${playerId}/portrait?size=128`}
                borderRadius="lg"
                alt="Eve character"
            />
            <Text fontWeight="bold" mt='0.25em'>{name}</Text>
            <Divider mt={'1em'} />
            <HStack
                spacing={3}
                mt={'1em'}
                alignItems={'center'}
                justifyContent={'center'}
                textAlign={'center'}
            >
                <IconButton
                    icon={<FaRegTrashAlt />}
                    aria-label={'Delete Character'}
                    title={'Delete Character'}
                />
                <IconButton
                    icon={<FaCloudDownloadAlt />}
                    aria-label={'Update Character'}
                    title={'Update Character'}
                />
            </HStack>
        </CardBody>
    </Card>
);

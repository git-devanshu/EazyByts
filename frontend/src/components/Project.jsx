import React from 'react';
import {Heading, Spacer, Link, Button} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function Project({data, action}) {
    return (
        <div style={{borderRadius: '8px', backgroundColor: '#02222d', minHeight: '250px', minWidth: '400px', maxWidth: '100%', display: 'flex', justifyContent: 'left', marginTop: '10px', paddingLeft: '10px', paddingBottom: '5px'}}>
            <div style={{maxWidth: '200px'}}>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Title</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.projectTitle}</Heading>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Description</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.description}</Heading>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Project Link </text>
                <Link color={'white'} href={`${data.projectLink}`}>{data.projectLink}</Link>
            </div>
            <Spacer/>
            <div>
                <img src={data.imageURL} style={{height: '200px', width: '200px', margin: '10px'}}/>
                <Button leftIcon={<DeleteIcon/>} onClick={action} ml={'10px'} bgColor={'red'} colorScheme='red'>Delete</Button>
            </div>
        </div>
    );
}

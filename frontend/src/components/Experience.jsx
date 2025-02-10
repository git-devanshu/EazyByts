import React from 'react';
import {Heading, Spacer} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function Experience({data, action}) {
    return (
        <div style={{borderRadius: '8px', backgroundColor: '#02222d', minHeight: '140px', minWidth: '260px', maxWidth: '300px', display: 'flex', justifyContent: 'left', marginTop: '10px', paddingLeft: '10px'}}>
            <div style={{maxWidth: '200px'}}>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Post</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.post}</Heading>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Organization</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.organization}</Heading>
                <text style={{fontSize: '14px', color: 'gray', fontWeight: '400'}}>Year Joined</text>
                <Heading size={'sm'} color={'white'} fontWeight={400}>{data.yearJoined}</Heading>
            </div>
            <Spacer/>
            <div onClick={action} style={{margin: '10px', backgroundColor: 'red', height: '40px', width:'40px', borderRadius: '20px', display: 'grid', placeItems: 'center'}}>
                <DeleteIcon boxSize={6}/>
            </div>
        </div>
    );
}

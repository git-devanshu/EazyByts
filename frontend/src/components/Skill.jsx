import React from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
import { Text, Progress } from '@chakra-ui/react';

export default function Skill({data, action}) {
    return (
        <div style={{borderRadius: '8px', backgroundColor: '#02222d', height: '80px', minWidth: '260px', maxWidth: '300px', display: 'flex', alignItems: 'center', marginTop: '10px'}}>
            <div onClick={action} style={{height: '50px', width: '50px', borderRadius: '25px', backgroundColor: 'red', display:'grid', placeItems: 'center', marginLeft: '10px'}}>
                <DeleteIcon boxSize={6}/>
            </div>
            <div style={{marginLeft: '10px'}}>
                <Text color={'white'} mb={'5px'}>{data.skillName}</Text>
                <Progress value={data.skillLevel} width={'180px'} size='xs'/>
            </div>
        </div>
    );
}

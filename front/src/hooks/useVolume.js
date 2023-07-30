import {useContext} from 'react';
import { VolumeContext } from '../contexts/VolumeContext';

export const useVolume = () => {
    return useContext(VolumeContext);
}
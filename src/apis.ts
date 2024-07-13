import axios from 'axios';

import { extractKPI } from './utils'

const API_BASE_URL = process.env?.REACT_APP_API_BASE_URL;
export const getMetrics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/metrics`);
        return response.data.data;
    }
    catch (e) {
        return null;
    }
};

export const getSegments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/segments`);
        return response.data.data;
    }
    catch (e) {
        return null;
    }
};

export const getSnapshot = async (metric: string, segmentKey: string, segmentId: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/snapshot`, {
            metric,
            segmentKey,
            segmentId: segmentId,
        });
        return extractKPI(response.data.data);
    } catch (e) {
        return null;
    }
};

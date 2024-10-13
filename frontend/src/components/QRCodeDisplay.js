import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeDisplay = ({ data }) => {
    return <QRCodeCanvas value={data} size={100} />;
};

export default QRCodeDisplay;

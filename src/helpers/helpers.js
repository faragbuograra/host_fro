/**
 * Helpers Functions
 */
import moment from 'moment';
import CryptoJS from 'crypto-js';
export function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000;
    let formatDate = format ? format : 'MM-DD-YYYY';
    return moment(time).format(formatDate);
}

/**
 * Convert Date To Timestamp
*/
export function convertDateToTime(date, format) {
    const dateObject = new Date(date);

    // Format the date and time
    const formattedDateTime = dateObject.toLocaleString("ar", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric"
    });
    
   return(formattedDateTime);
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
    let location = url.pathname;
    let path = location.split('/');
    return path[1];
}

export const encryptData = (data, salt) =>
CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();
                                   
                                   
export const decryptData = (ciphertext, salt) => {
const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
try {
return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}catch(err){
return null;
}
}
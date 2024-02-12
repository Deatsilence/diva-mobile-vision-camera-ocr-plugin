import { Frame } from 'react-native-vision-camera';
export type BoundingFrame = {
    x: number;
    y: number;
    width: number;
    height: number;
    boundingCenterX: number;
    boundingCenterY: number;
};
export type BoundingBox = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export type Point = {
    x: number;
    y: number;
};
export type TextElement = {
    text: string;
    frame?: BoundingFrame;
    boundingBox?: BoundingBox;
    cornerPoints?: Point[];
};
export type TextLine = {
    text: string;
    elements: TextElement[];
    frame?: BoundingFrame;
    boundingBox?: BoundingBox;
    recognizedLanguages: string[];
    cornerPoints?: Point[];
};
export type TextBlock = {
    text: string;
    lines: TextLine[];
    frame?: BoundingFrame;
    boundingBox?: BoundingBox;
    recognizedLanguages: string[];
    cornerPoints?: Point[];
};
export type Text = {
    text: string;
    blocks: TextBlock[];
};
export type OCRFrame = {
    result: Text;
};
export declare function scanOCR(frame: Frame): OCRFrame;
export declare function mrzParse(initialLines: string[]): {
    docMRZ: string;
    docType: "ADIT_STAMP" | "ALIEN_REGISTRATION" | "BIRTH_CERTIFICATE" | "BORDER_CROSSING_CARD" | "CEDULA" | "CERTIFICATE_OF_NATURALIZATION" | "CITIZENSHIP_CARD" | "DRIVERS_LICENSE" | "DSP150_FORM" | "EMPLOYEE_AUTHORIZATION" | "GOVERNMENT_ISSUED_ID" | "I512" | "I551" | "I94" | "INTERPOL_NOTICE" | "MILITARY_CARD" | "NATIONAL_ID" | "OTHER" | "PASSPORT" | "REENTRY_PERMIT" | "REFUGEE_PERMIT" | "REFUGEE_TRAVEL_DOCUMENT" | "REFUGEE_ASYLEE" | "TRANSPORTATION_LETTER" | "TRIBAL_CARD" | "TRUSTED_TRAVELER_CARD" | "VISA" | "VOTER_REGISTRATION" | undefined;
    issuingCountry: any;
    givenNames: string;
    lastNames: string;
    idNumber: string;
    nationality: any;
    dob: string | undefined;
    gender: string;
    docExpirationDate: string | undefined;
    additionalInformation: undefined;
} | {
    docMRZ: string;
    docType: "ADIT_STAMP" | "ALIEN_REGISTRATION" | "BIRTH_CERTIFICATE" | "BORDER_CROSSING_CARD" | "CEDULA" | "CERTIFICATE_OF_NATURALIZATION" | "CITIZENSHIP_CARD" | "DRIVERS_LICENSE" | "DSP150_FORM" | "EMPLOYEE_AUTHORIZATION" | "GOVERNMENT_ISSUED_ID" | "I512" | "I551" | "I94" | "INTERPOL_NOTICE" | "MILITARY_CARD" | "NATIONAL_ID" | "OTHER" | "PASSPORT" | "REENTRY_PERMIT" | "REFUGEE_PERMIT" | "REFUGEE_TRAVEL_DOCUMENT" | "REFUGEE_ASYLEE" | "TRANSPORTATION_LETTER" | "TRIBAL_CARD" | "TRUSTED_TRAVELER_CARD" | "VISA" | "VOTER_REGISTRATION" | undefined;
    issuingCountry: any;
    givenNames: string;
    lastNames: string;
    idNumber: string;
    nationality: any;
    dob: string | undefined;
    gender: string;
    docExpirationDate: string | undefined;
    additionalInformation: string;
} | undefined;

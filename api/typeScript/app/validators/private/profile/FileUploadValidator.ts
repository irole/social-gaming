import {body} from "express-validator";
import Validator from "../../Validator";


class FileUploadValidator extends Validator {


    handle() {
        return [
            body('file').custom(async (value, {req}) => {
                // @ts-ignore
                if (req.query._method === 'put' && value === undefined) return;

                if (!value)
                    throw new Error(req.__('typeScript.app.http.validators.file-upload-validator.require-insert-file'));
                let fileExt = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'svg', 'SVG', "mkv", "mp4", "mpeg", "MKV", "MP4", "MPEG", "MP3", "mp3", "FLAC", "flac", "WAV", "wav", "doc", "DOC", "docx", "DOCX", "ppt", "PPT", "pptx", "PPTX", "txt", "TXT", "pdf", "PDF", "rar", "RAR", "zip", "ZIP", "7z", "7Z"];
                if (!fileExt.includes(value.type)) {
                    req.body.httpStatus = Option['httpStatus'].s415;
                    throw new Error(req.__('typeScript.app.http.validators.file-upload-validator.file-extension'))
                }
                // Limit
                if (value.size > 1024 * 1024 * 10) {
                    throw new Error(req.__('typeScript.app.http.validators.file-upload-validator.file-size'));
                }

            }),
        ]
    }


}

export default new FileUploadValidator();

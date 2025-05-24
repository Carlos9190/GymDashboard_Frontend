import { FieldError } from "react-hook-form"

type ImageUploadProps = {
    field: {
        value: File | null
        onChange: (value: File | null) => void
    }
    error?: FieldError
}

const ImageUpload = ({ field }: ImageUploadProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        field.onChange(file)
    }

    return (
        <div className="flex items-center justify-between">
            <input
                id="file"
                type="file"
                name="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            <label
                htmlFor="file"
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center"
            >
                Upload Image
            </label>

            <p className="text-sm text-gray-400 pr-3">
                {field.value ? field.value.name : "No file selected"}
            </p>
        </div>
    )
}

export default ImageUpload

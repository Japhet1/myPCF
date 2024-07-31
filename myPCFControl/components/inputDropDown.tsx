import * as React from "react";
// import { ISelectableDroppableTextProps, SelectableDroppableText } from '@fluentui/react/lib/SelectableOption';
// import { PrimaryButton, TextField, Stack, IStackTokens } from '@fluentui/react/lib/Stack';

// const stackTokens: IStackTokens = { childrenGap: 20 };

export const InputForm: React.FC = () => {
    // const [text, setText] = React.useState;
    const [selectedText, setSelectedText] = React.useState<string | undefined>(undefined);

    // Define the props for SelectableDroppableText
    // const selectableDroppableTextProps: ISelectableDroppableTextProps = {
    //     onChange: (newValue: string) => {
    //         setText(newValue);
    //     },
    //     onItemDrop: (item: string) => {
    //         setSelectedText(item);
    //     },
    //     // Optional: you can provide a default value or other configurations
    //     defaultValue: text
    // };

    // Handle form submission
    // const handleSubmit = () => {
    //     console.log('Submitted Text:', text);
    //     console.log('Selected Text:', selectedText);
    // };

    return (
        // <Stack tokens={stackTokens}>
        //     <TextField
        //         label="Enter Text"
        //         value={text}
        //         onChange={(e, newValue) => setText(newValue || '')}
        //     />
        //     <SelectableDroppableText
        //         placeholder="Drag and drop items here or select text"
        //         {...selectableDroppableTextProps}
        //     />
        //     <PrimaryButton text="Submit" onClick={handleSubmit} />
        // </Stack>
        <></>
    );
};

// export default InputForm;

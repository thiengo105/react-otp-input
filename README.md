# React PIN Code

A customizable PIN code input component for React applications.

## Features

- TypeScript support
- Customizable length
- Keyboard navigation
- Paste support
- Mobile-friendly numeric input
- Accessible
- Customizable styling
- Disabled state support

## Installation

```bash
npm install react-pin-code
# or
yarn add react-pin-code
```

## Usage

```tsx
import { PinCode } from 'react-pin-code';

function App() {
  const handleComplete = (value: string) => {
    console.log('PIN completed:', value);
  };

  return (
    <PinCode
      length={4}
      onComplete={handleComplete}
      onChange={(value) => console.log('Current value:', value)}
      placeholder="○"
      disabled={false}
      style={{ margin: '20px' }}
      inputStyle={{ borderColor: '#000' }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| length | number | 4 | Number of input fields |
| onChange | (value: string) => void | - | Callback when value changes |
| onComplete | (value: string) => void | - | Callback when all fields are filled |
| disabled | boolean | false | Disable the input fields |
| placeholder | string | "○" | Placeholder character |
| inputMode | "numeric" \| "tel" | "numeric" | Input mode for mobile devices |
| style | React.CSSProperties | - | Container style |
| inputStyle | React.CSSProperties | - | Individual input style |

## License

MIT 
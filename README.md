# React PIN Code

A customizable PIN code input component for React applications with TypeScript support.

## Features

- TypeScript support
- Customizable length
- Keyboard navigation
- Paste support
- Mobile-friendly numeric input
- Accessible
- Customizable styling
- Disabled state support
- Secure input mode
- Form library integration (react-hook-form, Formik, etc.)

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
| secure | boolean | false | Hide input values |
| maskChar | string | "•" | Character to use for masking |
| value | string | - | Controlled input value |
| defaultValue | string | "" | Default input value |

## Form Integration

### React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { PinCode } from 'react-pin-code';

function Form() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      pin: ''
    }
  });

  const onSubmit = (data: { pin: string }) => {
    console.log('PIN:', data.pin);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="pin"
        control={control}
        rules={{ required: true, minLength: 4 }}
        render={({ field }) => (
          <PinCode
            length={4}
            value={field.value}
            onChange={field.onChange}
            ref={field.ref}
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build
npm run build

# Run tests
npm test
```

## License

MIT 
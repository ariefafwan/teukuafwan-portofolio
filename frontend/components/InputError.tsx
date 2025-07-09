export default function InputError({ name, errors }: { name: string; errors: Record<string, string[]> }) {
  if (!errors?.[name]) return null;

  return <p className="text-red-500 text-sm mt-1">{errors[name][0]}</p>;
}

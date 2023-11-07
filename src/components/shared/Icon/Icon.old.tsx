
const Icon = new Proxy(
  {} as any,
  {
    get: (target, name: string) => ({ size = 'md', width = 24, height = 24, ...props }) => {
      const sizes = { sm: 16, md: 32, lg: 48 }
      return <img
        src={`/assets/${name.toLowerCase()}.svg`}
        alt={name}
        width={width}
        height={height}
        {...props}
      />
    },
  }
)
export default Icon
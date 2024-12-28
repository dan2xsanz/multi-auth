import { CommonTypography, TypographySizeEnum } from '@/index'
import { Select, SelectItem } from '@nextui-org/react'
import { CSSProperties, Fragment } from 'react'
import './dropdown.css'

interface ItemsInterface {
  key: string | number
  value: number | string
  label: string
}

interface CommonDropdownInterface {
  label?: string
  isError?: boolean
  required?: boolean
  selectedKeys?: any
  items: ItemsInterface[]
  onChange: (data: any) => void
  defaultSelectedKeys: string[] | number[]
  style?: CSSProperties | undefined
}

export const CommonDropdown = (props: CommonDropdownInterface) => {
  const {
    items,
    style,
    label,
    isError,
    required,
    onChange,
    selectedKeys,
    defaultSelectedKeys,
  } = props

  const dynamicStyles = {
    backgroundColor: 'white',
    borderWidth: '1px',
    borderColor: 'gray',
  }

  const errorStyles = {
    backgroundColor: '#FBF9FA',
    borderWidth: '0.001rem',
    borderColor: 'rgba(0, 0, 0, 0.419)',
    boxShadow: '0 0 5px black',
  }

  return (
    <Fragment>
      <Select
        size='sm'
        radius='none'
        className='dropdown-field'
        onChange={onChange}
        selectedKeys={selectedKeys}
        label={`${required ? '*' : ''} ${label ? label : ''}`}
        defaultSelectedKeys={defaultSelectedKeys}
        style={
          isError && selectedKeys[0] === ''
            ? { ...errorStyles, ...style }
            : { ...dynamicStyles, ...style }
        }
      >
        {items.map((item) => (
          <SelectItem
            key={item.key}
            style={{ color: 'black', borderRadius: 'none' }}
          >
            {item.label}
          </SelectItem>
        ))}
      </Select>
      {isError && selectedKeys[0] === '' && (
        <CommonTypography
          isError={true}
          size={TypographySizeEnum.note}
          label={`${label} field is required`}
          style={{ marginTop: '-9px', color: 'black' }}
        />
      )}
    </Fragment>
  )
}

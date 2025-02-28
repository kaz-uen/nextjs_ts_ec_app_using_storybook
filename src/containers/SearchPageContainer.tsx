'use client';

import { useCallback, useState } from "react";
import {
  CheckBoxOutlineBlankIcon,
  CheckBoxIcon,
} from '@/components/atoms/IconButton'
import styled from "styled-components";
import { useSearchParams, useRouter } from "next/navigation";
import { theme } from "@/themes";

const Aside = styled.aside`
  width: 200px;
`

const CheckBoxElements = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const CheckBox = styled.input`
  display: none;
`

const Heading = styled.h2`
  font-size: ${theme.fontSizes.mediumLarge}px;
`

const items = [
  { label: '新品', name: 'new' },
  { label: '中古', name: 'used' },
];

const SearchPageContainer = () => {
  const router = useRouter();
  // 商品の状態をクエリから取得（配列）
  const searchParams = useSearchParams();
  const conditions = searchParams.getAll('condition') ?? [];

  // 「商品の状態」のチェックボックスの状態を管理
  const [selected, setSelected] = useState(conditions);

  const handleChange = (newConditions: string[]) => {
    const params = new URLSearchParams();
    newConditions.forEach((condition) => {
      params.append('condition', condition);
    });

    router.push(`${window.location.pathname}?${params.toString()}`);
  }

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.name;
      const newSelected = e.target.checked
        ? [...selected, value]
        : selected.filter((v) => v !== value);

      setSelected(newSelected);
      handleChange && handleChange(newSelected);
    }, [selected])

  const onClick = useCallback((name: string) => {
    const newSelected = selected.includes(name)
      ? selected.filter(v => v !== name)
      : [...selected, name];

    setSelected(newSelected);
    handleChange && handleChange(newSelected);
  },[selected])

  return (
    <>
      <Aside>
        <Heading>商品の状態</Heading>
        {items.map(({ label, name }) => (
          <CheckBoxElements key={name}>
            <Label htmlFor={name} onClick={() => onClick(name)}>
              <CheckBox
                name={name}
                type="checkbox"
                checked={selected.includes(name)}
                onChange={onChange}
              />
              {selected.includes(name) ? (
                <CheckBoxIcon size={20} />
              ) : (
                <CheckBoxOutlineBlankIcon size={20} />
              )}
              <span>{label}</span>
            </Label>
          </CheckBoxElements>
        ))}
      </Aside>
    </>
  )
}

export default SearchPageContainer;

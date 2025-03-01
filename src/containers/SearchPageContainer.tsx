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

const Heading = styled.h2`
  font-size: ${theme.fontSizes.mediumLarge}px;
  margin-bottom: 8px;
`

const CheckBoxElements = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const LabelText = styled.span`
  margin-left: 4px;
`

const CheckBox = styled.input`
  display: none;
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
    try {
      const params = new URLSearchParams();
      newConditions.forEach((condition) => {
        params.append('condition', condition);
      });

      router.push(`?${params.toString()}`);
    } catch (error) {
      console.error('URLパラメータの更新中にエラーが発生しました:', error);
      // NOTE：必要に応じてユーザーへの通知を追加
    }
  }

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.name;
      const newSelected = e.target.checked
        ? [...selected, value]
        : selected.filter((v) => v !== value);

      setSelected(newSelected);
      handleChange(newSelected);
    }, [selected, handleChange])

  const onClick = useCallback((name: string) => {
    const newSelected = selected.includes(name)
      ? selected.filter(v => v !== name)
      : [...selected, name];

    setSelected(newSelected);
    handleChange(newSelected);
  },[selected, handleChange])

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
              <LabelText>{label}</LabelText>
            </Label>
          </CheckBoxElements>
        ))}
      </Aside>
    </>
  )
}

export default SearchPageContainer;

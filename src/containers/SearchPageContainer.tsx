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
  const conditions = searchParams.getAll('condition') ?? []; // URLから'condition'パラメータの値を全て取得

  // 選択された「商品の状態」を状態として管理
  const [selected, setSelected] = useState(conditions);

  // URLパラメータを更新する関数
  const handleChange = (newConditions: string[]) => {
    try {
      const params = new URLSearchParams(); // URLパラメータを構築するためのオブジェクトを作成
      newConditions.forEach((condition) => {
        params.append('condition', condition); // 各条件をURLパラメータに追加
      });

      router.push(`${window.location.pathname}?${params.toString()}`);
    } catch (error) {
      console.error('URLパラメータの更新中にエラーが発生しました:', error);
      // NOTE：必要に応じてユーザーへの通知を追加
    }
  }

  // チェックボックスの変更イベントハンドラ
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.name;
      const newSelected = e.target.checked
        ? [...selected, value] // チェックされた場合は配列に追加
        : selected.filter((v) => v !== value); // チェックが外された場合は配列から削除

      setSelected(newSelected);
      handleChange(newSelected);
    }, [selected])

  // アイコンクリック時のイベントハンドラ
  const onClick = useCallback((name: string) => {
    const newSelected = selected.includes(name)
      ? selected.filter(v => v !== name) // すでに選択されている場合は削除
      : [...selected, name]; // 選択されていない場合は追加

    setSelected(newSelected);
    handleChange(newSelected);
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
                aria-checked={selected.includes(name)}
                aria-label={label}
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

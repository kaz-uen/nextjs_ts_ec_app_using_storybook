'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckBoxOutlineBlankIcon,
  CheckBoxIcon,
} from '@/components/atoms/IconButton'
import styled from "styled-components";
import { useSearchParams, useRouter } from "next/navigation";

type SearchPageProps = {
  params: {
    slug: string[];
  }
}

const Aside = styled.aside`
  width: 200px;
`

const CheckBoxElement = styled.input`
  display: none;
`

const items = [
  { label: '新品', name: 'new' },
  { label: '中古', name: 'used' },
];

const SearchPageContainer = ({ params }: SearchPageProps) => {
  const router = useRouter();
  // 商品の状態をクエリから取得（配列）
  const searchParams = useSearchParams();
  const conditions = searchParams.getAll('condition') ?? [];

  // 「商品の状態」のチェック状態を管理
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
        <span>商品の状態</span>
        {items.map(({ label, name }) => (
          <div key={name}>
            <label htmlFor={name} onClick={() => onClick(name)}>
              <CheckBoxElement
                name={name}
                type="checkbox"
                checked={selected.includes(name)}
                onChange={onChange}
              />
              {selected.includes(name) ? (
                <CheckBoxIcon size={20} onClick={() => onClick(name)} />
              ) : (
                <CheckBoxOutlineBlankIcon size={20} onClick={() => onClick(name)} />
              )}
              {label}
            </label>
          </div>
        ))}
      </Aside>
    </>
  )
}

export default SearchPageContainer;

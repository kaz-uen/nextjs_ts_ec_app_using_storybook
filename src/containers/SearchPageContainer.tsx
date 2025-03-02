'use client';

import { useCallback, useState } from "react";
import {
  CheckBoxOutlineBlankIcon,
  CheckBoxIcon,
} from '@/components/atoms/IconButton'
import ProductCardListContainer from "@/containers/ProductCardListContainer";
import styled from "styled-components";
import { useSearchParams, useRouter } from "next/navigation";
import { theme } from "@/themes";
import Link from "next/link";
import { Category, Condition } from "@/types";

interface SearchPageContainerProps {
  params: {
    slug: string[];
  }
}

const Root = styled.div`
  display: flex;
  justify-content: center;
`

const Inner = styled.div`
  display: flex;
  padding: 30px 0;
  @media screen and (min-width: ${theme.breakPoints.md}) {
    width: 1040px;
  }
`

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

const CategoryLinks = styled.div`
  display: inline-flex;
  flex-direction: column;
`

const CategoryLink = styled(Link)`
  display: inline-block;
  margin-bottom: 4px;
  &:hover {
    text-decoration: underline;
  }
`

const items = [
  { label: '新品', name: 'new' },
  { label: '中古', name: 'used' },
];

const categoryNameDict = {
  book: '本',
  shoes: 'シューズ',
  clothes: 'トップス',
}

const SearchPageContainer = ({ params }: SearchPageContainerProps) => {
  const router = useRouter();
  // 商品の状態をクエリから取得（配列）
  const searchParams = useSearchParams();
  const conditions = searchParams.getAll('condition') as Condition[] ?? []; // URLから'condition'パラメータの値を全て取得

  // 選択された「商品の状態」を状態として管理
  const [selected, setSelected] = useState<Condition[]>(conditions);

  // URLパラメータを更新する関数
  const handleChange = (newConditions: Condition[]) => {
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
      const value = e.target.name as Condition;
      const newSelected = e.target.checked
        ? [...selected, value] // チェックされた場合は配列に追加
        : selected.filter((v) => v !== value); // チェックが外された場合は配列から削除

      setSelected(newSelected);
      handleChange(newSelected);
    }, [selected])

  // アイコンクリック時のイベントハンドラ
  const onClick = useCallback((name: Condition) => {
    const newSelected: Condition[] = selected.includes(name)
      ? selected.filter(v => v !== name) // すでに選択されている場合は削除
      : [...selected, name]; // 選択されていない場合は追加

    setSelected(newSelected);
    handleChange(newSelected);
  },[selected])

  return (
    <Root>
      <Inner>
        <Aside>
          <Heading>商品の状態</Heading>
          {items.map(({ label, name }) => (
            <CheckBoxElements key={name}>
              <Label htmlFor={name} onClick={() => onClick(name as Condition)}>
                <CheckBox
                  name={name}
                  type="checkbox"
                  checked={selected.includes(name as Condition)}
                  onChange={onChange}
                  aria-checked={selected.includes(name as Condition)}
                  aria-label={label}
                />
                {selected.includes(name as Condition) ? (
                  <CheckBoxIcon size={20} />
                ) : (
                  <CheckBoxOutlineBlankIcon size={20} />
                )}
                <LabelText>{label}</LabelText>
              </Label>
            </CheckBoxElements>
          ))}

          <Heading>カテゴリー</Heading>
          <CategoryLinks>
            <CategoryLink href="/search">すべて</CategoryLink>
            {Object.entries(categoryNameDict).map(([key, value]) => (
              <CategoryLink key={key} href={`/search/${key}`}>{value}</CategoryLink>
            ))}
          </CategoryLinks>
        </Aside>
        <section>
          <Heading>商品一覧</Heading>
          <ProductCardListContainer
            category={params?.slug[0] as Category}
            conditions={conditions}
          />
        </section>
      </Inner>
    </Root>
  )
}

export default SearchPageContainer;

'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { CardList } from "@/components/ui/card/card-list";
import { CardStore } from "@/components/ui/card/store";
import { useTranslations } from "@/i18n";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <PageWithNav>
        <Section header={t.home.header}>
          <CardList>
            <CardStore href="sushiro" url="/images/restaurant/sushiro.png" label="Sushiro" />
            <CardStore url="/images/restaurant/teenoi.png" label="Teenoi" disabled />
          </CardList>
        </Section>
      </PageWithNav>
    </>
  );
}

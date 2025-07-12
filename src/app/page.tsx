'use client';

import ButtonExamples from "@/components/examples/button-examples";
import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <PageWithNav>
      <Section header="Welcome to the PIII Cal Super App">
        <Button
          label="hello"
          leftIcon="add"
          rightIcon="arrow_forward"
          type="ghost"
          size="xs"
          onClick={() => console.log('hello world')} />
          <ButtonExamples />
      </Section>
    </PageWithNav>
  );
}

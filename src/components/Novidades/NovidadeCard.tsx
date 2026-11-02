import { useEffect, useEffectEvent, useRef } from "react";
import { novidadeBadge, novidadeCta, novidadeImage, novidadePrice, type Novidade } from "../../utils/novidades";
import { RestrictedMarkdown } from "./RestrictedMarkdown";
import { Body, CardWrap, CtaLink, Footer, Image, Price, Subtitle, Tag, Text, Title } from "./styles";

type NovidadeCardProps = {
  novidade: Novidade;
  /** Chamado uma vez quando o card fica pelo menos 50% visível. */
  onImpression: () => void;
  onClick: () => void;
};

export function NovidadeCard({ novidade, onImpression, onClick }: NovidadeCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reportImpression = useEffectEvent(onImpression);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reportImpression();
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [novidade.id]);

  const badge = novidadeBadge(novidade.kind);
  const image = novidadeImage(novidade);
  const price = novidadePrice(novidade);
  const cta = novidadeCta(novidade);

  return (
    <CardWrap ref={ref}>
      {image ? <Image src={image.url} alt={image.alt} loading="lazy" /> : null}
      <Body>
        {badge ? <Tag>{badge}</Tag> : null}
        <Title>{novidade.title}</Title>
        {novidade.subtitle ? <Subtitle>{novidade.subtitle}</Subtitle> : null}
        {price ? <Price>{price}</Price> : null}
        {novidade.bodyMd ? (
          <Text>
            <RestrictedMarkdown source={novidade.bodyMd} />
          </Text>
        ) : null}
        {cta ? (
          <Footer>
            <CtaLink href={cta.url} target="_blank" rel="noopener noreferrer" onClick={onClick}>
              {cta.label}
            </CtaLink>
          </Footer>
        ) : null}
      </Body>
    </CardWrap>
  );
}

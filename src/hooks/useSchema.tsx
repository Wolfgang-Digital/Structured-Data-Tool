import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { OrganizationType, WebPage, MainEntityType } from 'types';
import { getOrganizations } from 'features/Organizations/slice';
import { getWebPages } from 'features/WebPages/slice';
import { getMainEntityList } from 'features/MainEntities/slice';
import { transformSchema } from 'utils/transformer';

export const useSchema = () => {
  const { organizationId, webPageId, id } = useParams();

  const organizations: Record<string, OrganizationType> = useSelector(getOrganizations);
  const webPages: Record<string, WebPage> = useSelector(getWebPages);
  const mainEntities: Partial<MainEntityType>[] = useSelector(getMainEntityList);

  return useMemo(() => {
    const organization = organizations[id || (organizationId as string)];
    const webPage = webPages[webPageId as string];
    const mainEntity = mainEntities.find(entity => entity.parentId === webPageId);

    return transformSchema({
      organization,
      webPage,
      mainEntity: mainEntity as MainEntityType
    });
  }, [id, organizationId, webPageId, organizations, webPages, mainEntities]);
};

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form } from 'schema-form-generator';
import { v4 } from 'uuid';
import { get } from 'lodash';
import { useToast } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { RootState } from 'store';
import { styles, namedStyles } from 'styles/formStyles';
import { createOrUpdateWebPage } from './slice';
import { schema, validationSchema } from './schema';

const WebPageForm: React.FC = () => {
  const history = useHistory();

  const toast = useToast();

  const dispatch = useDispatch();

  const { organizationId, webPageId } = useParams();

  const organizations = useSelector((state: RootState) => state.organizations.entities);
  const webPages = useSelector((state: RootState) => state.webPages.entities);

  const defaultValues: Record<string, any> = useMemo(() => {
    return get(webPages, webPageId || '', {});
  }, [webPages, webPageId]);

  const handleSubmit = (values: any) => {
    if (organizationId) {
      const uuid = webPageId || v4();
      dispatch(createOrUpdateWebPage({ uuid, parentId: organizationId, ...values }));
      toast({
        status: 'success',
        description: `Web Page ${webPageId ? 'updated' : 'created'}!`,
        duration: 2000,
        position: 'bottom-left',
        variant: 'left-accent'
      });
      if (!webPageId) {
        history.push(`/organizations/${organizationId}/web-pages/${uuid}`);
      }
    } else {
      toast({
        status: 'error',
        description: 'Could not find parent ID',
        duration: 2000,
        position: 'bottom-left',
        variant: 'left-accent'
      });
    }
  };

  if (!organizationId || !organizations[organizationId]) {
    return <h1>404</h1>;
  }

  return (
    <Form
      schema={schema}
      handleSubmit={handleSubmit}
      styleProps={styles}
      namedStyleProps={namedStyles}
      formOptions={{
        defaultValues,
        validationSchema
      }}
    />
  );
};

export default WebPageForm;

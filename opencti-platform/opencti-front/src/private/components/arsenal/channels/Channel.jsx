import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import ChannelDetails from './ChannelDetails';
import ChannelEdition from './ChannelEdition';
import Security from '../../../../utils/Security';
import { KNOWLEDGE_KNUPDATE } from '../../../../utils/hooks/useGranted';
import StixCoreObjectOrStixCoreRelationshipNotes from '../../analyses/notes/StixCoreObjectOrStixCoreRelationshipNotes';
import StixDomainObjectOverview from '../../common/stix_domain_objects/StixDomainObjectOverview';
import StixCoreObjectExternalReferences from '../../analyses/external_references/StixCoreObjectExternalReferences';
import StixCoreObjectLatestHistory from '../../common/stix_core_objects/StixCoreObjectLatestHistory';
import SimpleStixObjectOrStixRelationshipStixCoreRelationships from '../../common/stix_core_relationships/SimpleStixObjectOrStixRelationshipStixCoreRelationships';
import StixCoreObjectOrStixRelationshipLastContainers from '../../common/containers/StixCoreObjectOrStixRelationshipLastContainers';

const styles = () => ({
  gridContainer: {
    marginBottom: 20,
  },
});

class ChannelComponent extends Component {
  render() {
    const { classes, channel } = this.props;
    return (
      <>
        <Grid
          container={true}
          spacing={3}
          classes={{ container: classes.gridContainer }}
        >
          <Grid item xs={6}>
            <ChannelDetails channel={channel} />
          </Grid>
          <Grid item xs={6}>
            <StixDomainObjectOverview stixDomainObject={channel} />
          </Grid>
          <Grid item xs={6}>
            <SimpleStixObjectOrStixRelationshipStixCoreRelationships
              stixObjectOrStixRelationshipId={channel.id}
              stixObjectOrStixRelationshipLink={`/dashboard/arsenal/channels/${channel.id}/knowledge`}
            />
          </Grid>
          <Grid item xs={6}>
            <StixCoreObjectOrStixRelationshipLastContainers
              stixCoreObjectOrStixRelationshipId={channel.id}
            />
          </Grid>
          <Grid item xs={6}>
            <StixCoreObjectExternalReferences stixCoreObjectId={channel.id} />
          </Grid>
          <Grid item xs={6}>
            <StixCoreObjectLatestHistory stixCoreObjectId={channel.id} />
          </Grid>
        </Grid>
        <StixCoreObjectOrStixCoreRelationshipNotes
          stixCoreObjectOrStixCoreRelationshipId={channel.id}
          defaultMarkings={channel.objectMarking ?? []}
        />
        <Security needs={[KNOWLEDGE_KNUPDATE]}>
          <ChannelEdition channelId={channel.id} />
        </Security>
      </>
    );
  }
}

ChannelComponent.propTypes = {
  channel: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
};

const Channel = createFragmentContainer(ChannelComponent, {
  channel: graphql`
    fragment Channel_channel on Channel {
      id
      standard_id
      entity_type
      x_opencti_stix_ids
      spec_version
      revoked
      confidence
      created
      modified
      created_at
      updated_at
      createdBy {
        ... on Identity {
          id
          name
          entity_type
          x_opencti_reliability
        }
      }
      creators {
        id
        name
      }
      objectMarking {
        id
        definition_type
        definition
        x_opencti_order
        x_opencti_color
      }
      objectLabel {
        id
        value
        color
      }
      name
      aliases
      status {
        id
        order
        template {
          name
          color
        }
      }
      workflowEnabled
      ...ChannelDetails_channel
    }
  `,
});

export default withStyles(styles)(Channel);

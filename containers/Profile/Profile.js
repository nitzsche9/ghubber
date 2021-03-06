// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { Spinner, ErrorView, ProfileView, ProfileOrganizationsView, ContributionsGraph } from 'components';
import { fetchProfile, fetchOrganizations } from 'actions';

// import flow types
import type { ProfileState } from 'reducers/profile';
import type { ProfileOrganizationsState } from 'reducers/profile-organizations';

type Props = {
    profile: ProfileState,
    profileOrganizations: ProfileOrganizationsState,
    fetchProfile: typeof fetchProfile,
    fetchOrganizations: typeof fetchOrganizations,
}

class Profile extends PureComponent<void, Props, void> {
    componentWillMount() {
        this.props.fetchProfile(this.props.navigation.params.id);
        this.props.fetchOrganizations(this.props.navigation.params.id);
    }

    renderOrganizations() {
        const { loading, error, organizations } = this.props.profileOrganizations;

        if (loading || error || !organizations) {
            return null;
        }

        return <ProfileOrganizationsView organizations={organizations} />
    }

    render() {
        const { loading, error, user } = this.props.profile;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            )
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <ErrorView
                        onPress={
                            () => this.props.fetchProfile(this.props.navigation.params.id)
                        }
                        error={error}
                        refreshable={true}
                    />
                </View>
            )
        }

        if (!user) {
            return null;
        }

        return (
            <ScrollView style={styles.root}>
                <ProfileView user={user} />
                {this.renderOrganizations()}
                <ContributionsGraph user={user} />
                <View style={styles.blank}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        flex: 1,
        padding: 10
    },
    blank: {
        flex: 1,
        height: 200
    }
});

export default connect(
    (state) => {
        return {
            profile: state.profile,
            profileOrganizations: state.profileOrganizations,
            navigation: state.navigation
        }
    },
    { fetchProfile, fetchOrganizations }
)(Profile);

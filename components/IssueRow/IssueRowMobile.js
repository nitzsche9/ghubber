// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

// import flow types
import type { IssueEntity } from 'github-flow-js';

type Props = {
    issue: IssueEntity,
    onPress: () => void
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    repositoryName: {
        flex: 0,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#586069',
        marginRight: 5
    },
    title: {
        flex: 0,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const ForkBadge = <View style={styles.forkBadge}><Text>Fork</Text></View>;

const RepositoryUrlPrefixLenght = 'https://api.github.com/repos/'.length;

export default class IssueRowMobile extends PureComponent<void, Props, void> {
    render() {
        const { issue, onPress } = this.props;

        const repositoryName = issue.repository_url.substring(RepositoryUrlPrefixLenght);

        return (
            <TouchableOpacity style={styles.row} onPress={onPress}>
                <Text style={styles.repositoryName} numberOfLines={1}>
                    {repositoryName}
                </Text>
                <Text style={styles.title} numberOfLines={1}>
                    {issue.title}
                </Text>
            </TouchableOpacity>
        )
    }
}

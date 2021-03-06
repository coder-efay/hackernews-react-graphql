import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Link from 'next/link';
import * as React from 'react';
import renderHTML from 'react-render-html';

import { UserModel } from '../src/data/models';
import { convertNumberToTimeAgo } from '../src/helpers/convert-number-to-time-ago';
import { withDataAndRouter } from '../src/helpers/with-data';
import { BlankLayout } from '../src/layouts/blank-layout';
import { MainLayout } from '../src/layouts/main-layout';

export interface IUserPageProps extends IUserPageOwnProps {
  loading: boolean;
  error;
  user: UserModel;
  me;
}

interface IUserPageOwnProps {
  currentUrl: string;
}

const UserPageView: React.SFC<IUserPageProps> = (props) => {
  const { error, user, me, currentUrl } = props;

  if (error) {
    return <BlankLayout>Error loading news items.</BlankLayout>;
  }
  if (!user) {
    return <BlankLayout>No such user.</BlankLayout>;
  }

  let about = user.about || '';
  let email = user.email || '';

  const onAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    about = e.target.value;
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    email = e.target.value;
  };

  if (me && user.id === me.id)
    return (
      <MainLayout currentUrl={currentUrl} isFooterVisible={false}>
        <tr>
          <td>
            <form className="profileform" method="post" action="/xuser">
              <input type="hidden" name="id" value="clintonwoo" />
              <input type="hidden" name="hmac" value="71104445c3c41b4167c38db67a656e610d5fbad9" />
              <table style={{ border: '0px' }}>
                <tbody>
                  <tr className="athing">
                    <td style={{ verticalAlign: 'top' }}>user:</td>
                    <td>
                      <Link href="/user?id=clintonwoo">
                        <a className="hnuser" style={{ color: '#3c963c' }}>
                          {user.id}
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>created:</td>
                    <td>{convertNumberToTimeAgo(user.creationTime)}</td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>karma:</td>
                    <td>{user.karma}</td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>about:</td>
                    <td>
                      <textarea
                        cols={60}
                        defaultValue={renderHTML(about)}
                        name="about"
                        onChange={onAboutChange}
                        rows={5}
                        style={{ fontSize: '-2' }}
                        wrap="virtual"
                      />
                      <Link href="/formatdoc">
                        <a tabIndex={-1} style={{ color: '#afafaf' }}>
                          help
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>email:</td>
                    <td>
                      <input
                        type="text"
                        name="uemail"
                        defaultValue={email}
                        onChange={onEmailChange}
                        size={60}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>showdead:</td>
                    <td>
                      <select defaultValue="no" name="showd">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>noprocrast:</td>
                    <td>
                      <select defaultValue="no" name="nopro">
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>maxvisit:</td>
                    <td>
                      <input type="text" name="maxv" defaultValue="20" size={16} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>minaway:</td>
                    <td>
                      <input type="text" name="mina" defaultValue="180" size={16} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ verticalAlign: 'top' }}>delay:</td>
                    <td>
                      <input type="text" name="delay" defaultValue="0" size={16} />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link href="/changepw">
                        <a>
                          <u>change password</u>
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link href="/submitted?id=clintonwoo">
                        <a>
                          <u>submissions</u>
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link href="/threads?id=clintonwoo">
                        <a>
                          <u>comments</u>
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link href="/hidden">
                        <a>
                          <u>hidden</u>
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link href="/upvoted?id=clintonwoo">
                        <a>
                          <u>upvoted submissions</u>
                        </a>
                      </Link>
                      {' / '}
                      <Link href="/upvoted?id=clintonwoo&comments=t">
                        <a>
                          <u>comments</u>
                        </a>
                      </Link>
                      &nbsp;&nbsp;
                      <span style={{ fontStyle: 'italic' }}>(private)</span>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Link href="/favorites?id=clintonwoo">
                        <a>
                          <u>favorite submissions</u>
                        </a>
                      </Link>
                      {' / '}
                      <Link href="/favorites?id=clintonwoo&amp;comments=t">
                        <a>
                          <u>comments</u>
                        </a>
                      </Link>
                      &nbsp;&nbsp;
                      <span style={{ fontStyle: 'italic' }}>(shared)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <input type="submit" value="update" />
            </form>
            <br />
            <br />
          </td>
        </tr>
      </MainLayout>
    );

  return (
    <MainLayout currentUrl={currentUrl} isFooterVisible={false}>
      <tr>
        <td>
          <table style={{ border: '0' }}>
            <tbody>
              <tr className="athing">
                <td style={{ verticalAlign: 'top' }}>user:</td>
                <td>
                  <a href={`user?id=${user.id}`} className="hnuser">
                    {user.id}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>created:</td>
                <td>{convertNumberToTimeAgo(user.creationTime)}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>karma:</td>
                <td>{user.karma}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>about:</td>
                <td>{user.about && renderHTML(user.about)}</td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`submitted?id=${user.id}`}>
                    <u>submissions</u>
                  </a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`threads?id=${user.id}`}>
                    <u>comments</u>
                  </a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`favorites?id=${user.id}`}>
                    <u>favorites</u>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </td>
      </tr>
    </MainLayout>
  );
};

export interface IUserPageQuery {
  loading;
  error;
  user;
  me;
}

const query = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      about
      creationTime
      email
      karma
    }
    me {
      id
    }
  }
`;

export const UserPage = withDataAndRouter((props) => {
  const userId = (props.router.query && props.router.query.id) || '';

  const { data } = useQuery(query, { variables: { id: userId } });

  return (
    <UserPageView
      loading={data?.loading!}
      error={data?.error!}
      user={data?.user!}
      me={data?.me!}
      currentUrl={props.router.pathname}
    />
  );
});

export default UserPage;

FROM ubuntu:trusty
MAINTAINER Steven Velozo <steven@velozo.com>

###########################################
# Headlight MySQL 5.6 server
###########################################

# Prepare APT
ENV DEBIAN_FRONTEND noninteractive

#
#
# Install mysql 5.6
###########################################

#   -> taken from the tumtum mysql image
RUN apt-get update && apt-get -yq install mysql-server-5.6 pwgen

# Remove pre-installed database
RUN rm -rf /var/lib/mysql/*
# Remove syslog configuration
RUN rm /etc/mysql/conf.d/mysqld_safe_syslog.cnf

# Add MySQL configuration
ADD scripts/my.cnf /etc/mysql/conf.d/my.cnf
ADD scripts/mysqld_charset.cnf /etc/mysql/conf.d/mysqld_charset.cnf

# Add MySQL scripts
ADD scripts/import_sql.sh /import_sql.sh
ADD scripts/run.sh /run.sh
RUN chmod 755 /*.sh

# MySQL Exposed ENV
ENV MYSQL_USER admin
ENV MYSQL_PASS **Random**

# MySQL Replication ENV
ENV REPLICATION_MASTER **False**
ENV REPLICATION_SLAVE **False**
ENV REPLICATION_USER replica
ENV REPLICATION_PASS replica

#
#
# Global configurations
###########################################

# Clean APT
RUN rm -rf /var/lib/apt/lists/*

# Add VOLUMEs to allow backup of config and databases
VOLUME  ["/etc/mysql", "/var/lib/mysql"]

#
#
# Expose the port and run the server
###########################################

EXPOSE 3306
CMD ["/run.sh"]
